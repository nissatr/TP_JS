import axios from "axios";
import inquirer from "inquirer";
import chalk from "chalk";

// Constantes
const MAX_HP = 300; //Chaque Pokémon aura 300 points de vie (HP) maximum.
const API_URL = "https://pokeapi.co/api/v2/pokemon/"; //l’adresse de base pour aller chercher les données d’un Pokémon


//Elle prend le nom d’un Pokémon  et va chercher ses données sur l’API.
async function getPokemon(name) {
  const res = await axios.get(API_URL + name.toLowerCase());
  const data = res.data;
  //Sélection de quelques attaques au hasard
  const moves = data.moves
    .filter((m) => m.move && m.move.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

    //Pour chaque attaque, on va chercher ses détails complets 
  const detailedMoves = await Promise.all(
    moves.map(async (m) => {
      try {
        const moveRes = await axios.get(m.move.url);
        const moveData = moveRes.data;
        return {
          name: moveData.name,
          power: moveData.power || 40,
          accuracy: moveData.accuracy || 100,
          pp: moveData.pp || 10,
        };
      } catch {
        return { name: m.move.name, power: 40, accuracy: 100, pp: 10 };
      }
    })
  );

  //Retourne l’objet Pokémon
  return { name: data.name, moves: detailedMoves, hp: MAX_HP };
}

function attack(attacker, defender, move) {
  if (move.pp <= 0) {  //Vérifie si l’attaque a encore des PP
    console.log(chalk.yellow(`${attacker.name}'s ${move.name} has no PP left!`));
    return;
  }

  //Vérifie la précision
  move.pp -= 1;
  const hitChance = Math.random() * 100;
  if (hitChance > move.accuracy) {
    console.log(chalk.blue(`${attacker.name}'s ${move.name} missed!`));
    return;
  }

  //Applique les dégâts
  const damage = move.power;
  //On retire les points de vie du Pokémon défenseur
  defender.hp = Math.max(defender.hp - damage, 0);
  console.log(
    chalk.red(`${attacker.name} used ${move.name}! It dealt ${damage} damage.`)
  );
}

//Pose une question dans le terminal avec une liste d’attaques au choix.
async function chooseMove(pokemon) {
  const { moveName } = await inquirer.prompt([
    {
      type: "list",
      name: "moveName",
      message: `Choose a move for ${pokemon.name}:`,
      choices: pokemon.moves.map(
        (m) => `${m.name} (Power: ${m.power}, Acc: ${m.accuracy}, PP: ${m.pp})`
      ),
    },
  ]);
  const move = pokemon.moves.find((m) => moveName.includes(m.name));
  return move;
}

async function main() {
  console.log(chalk.green("Welcome to the Pokémon Battle Game!"));

  const { playerName } = await inquirer.prompt([
    { type: "input", name: "playerName", message: "Enter your Pokémon name:" },
  ]);

  const player = await getPokemon(playerName);
  const botList = ["pikachu", "charizard", "bulbasaur", "squirtle", "gengar"];
  const botName = botList[Math.floor(Math.random() * botList.length)];
  const bot = await getPokemon(botName);

  console.log(chalk.cyan(`You chose ${player.name}! Bot chose ${bot.name}!`));

  while (player.hp > 0 && bot.hp > 0) {
    console.log(chalk.magenta(`\n${player.name}: ${player.hp} HP | ${bot.name}: ${bot.hp} HP`));
    const move = await chooseMove(player);
    attack(player, bot, move);

    if (bot.hp <= 0) break;

    const botMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];
    attack(bot, player, botMove);
  }

  if (player.hp <= 0) {
    console.log(chalk.red(`\n${player.name} fainted! You lose `));
  } else {
    console.log(chalk.green(`\n${bot.name} fainted! You win `));
  }
}

main().catch(console.error);
