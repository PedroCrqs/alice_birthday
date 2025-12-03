export const listOfGuests = {
  "Erica Beta family": [
    "Luisa Pimentel",
    "Erica Pimentel",
    "Luan Pimentel",
    "Cleuza Pimentel",
    "Adriano",
  ],
  "Alexandre Family": [
    "Alexandre Cerqueira",
    "Lisiane Moura",
    "Bruna Lia Cerqueira",
    "Artur",
  ],
  "Andrea Family": [
    "Andrea Cerqueira",
    "Marco Vidal",
    "Beatriz Vidal",
    "Neuza Pereira",
    "Fabyolla Vidal",
  ],
  "Marcelo family": ["Marcelo Cerqueira", "Marcelo Santiago*", "Gisele Costa"],
  "Gustavo family": [
    "Gustavo Nunes",
    "Leticia Yssak",
    "Lucas Bezerra",
    "Lucas Miguel*",
    "Maria Yssak",
  ],
  "Denise family": ["Denise Lima", "Ana Licia Lima*"],
  "Erica family": ["Erica Matos", "Maria Eduarda Salles"],
  "Erick family": [
    "Erick Teixeira",
    "Erika Teixeira",
    "Vinícius Teixeira",
    "Adriano",
    "Gabriel Teixeira*",
    "Ana Paula Teixeira*",
    "Giovana Teixeira",
    "Guilherme Teixeira",
    "Júlia Teixeira*",
    "Monique",
    "Matheus Monteiro",
  ],
  "Phelippe family": [
    "Phelippe Toledo",
    "Janete Chaves",
    "Enrico Toledo*",
    "Regina Caetano",
  ],
  "Alan family": ["Alan Silva", "Erika Silva"],
  "Saci family": [
    "Emerson Domingos",
    "Adriana Santos",
    "Gabriel Paulino",
    "Richard Benite*",
    "Daiane Caroline",
    "Valentina Magalhães*",
  ],
  "Yuri family": ["Yuri Vidal"],
  "Rogerio family": ["Rogerio Rodrigues"],
  "Caue family": ["Caue", "Lara"],
  "Stephanie family": ["Stephanie Gomes", "Wallacy Sant'anna"],
  "Elizabete family": ["Elizabete Matos", "Annibal Ramos"],
  "Chagas family": [
    "Francisco Chagas",
    "Benjamin Telles*",
    "Elila Medeiros",
    "Dafne Telles",
  ],
  "Flavio family": ["Flavio Fialho", "Isis Fialho*"],
  "Gabriela family": ["Gabriela Villas"],
  "Camile family": ["Camile Santos"],
  "Paola family": ["Paola Aryadne"],
  "Daylane family": ["Daylane Campos"],
  "Tatiana family": ["Tatiana Carolina"],
  "Simone family": ["Simone Klein", "Natasha Klein*"],
  "Andreia family": ["Andreia Cristina"],
  "Thais family": ["Thais Araújo", "Nicoly Araújo*"],
  "Thais Dias family": ["Thais Dias"],
  "Elen family": ["Elen Lemos", "Helena Lemos*"],
  "Aurelio family": [
    "Aurélio Lessa",
    "Karina Duarte",
    "Benedita Pereira",
    "Elis Duarte*",
    "Miguel Duarte*",
    "Arthur Duarte*",
  ],
  "Jorgete family": ["Jorgete Moraes", "Fernando Moraes"],
  "Yasmim family": ["Yasmim Silva", "Ivan Silva"],
  "Sandro family": ["Sandro Moraes"],
  "Eli family": ["Eli Neto"],
  "Telma family": [
    "Telma Castro",
    "Selma Castro",
    "Pedro Yuri Nogueira",
    "Pamela Castro",
  ],
  "Micais family": ["Micaias Alves"],
};

export const RENDER_URL = "https://alice-birthday.onrender.com/confirm";

/**
 * @param {string} text
 * @returns {string}
 */

export function normalizeString(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
