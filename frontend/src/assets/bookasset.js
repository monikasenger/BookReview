import book1 from './book1.jpg'
import book2 from './book2.jpg'
import book3 from './book3.png'
import book4 from './book4.jpg'
import book5 from './book5.jpg'
import book6 from './book6.jpg'
import book7 from './book7.jpg'
import book8 from './book8.jpg'
import book9 from './book9.jpg'
import book10 from './book10.jpg'
import book11 from './book11.jpg'
import book12 from './book12.jpg'
import book13 from './book13.png'
import book14 from './book14.jpg'
import book15 from './book15.jpg'
import logo from './logo.png'
import upload_area from './upload_area.png'


export const bookasset = {
  book1, book2, book3, book4, book5,
  book6, book7, book8, book9, book10,
  book11, book12, book13, book14, book15,logo, upload_area
}

export const books = [
  {
    _id: 'book1',
    title: 'Classics',
    description: `Classics are the most read books and are even taught in schools and colleges. These books belong to a certain time period and they have literary merits. Books like Jane Eyre, Wuthering Heights, Robinson Crusoe, etc are just a few examples of classics.`,
    readingSuggestions: ['Pride and Prejudice', 'Lord of the Flies'],
    authorsToLookFor: ['Charles Dickens', 'Jane Austen', 'Charlotte Brontë'],
    cover: book1,
    genre: 'Fiction',
    year: 1850,
    price: 250,
    rating: 2.4,
  },
  {
    _id: 'book2',
    title: 'Tragedy',
    description: `Tragedy focuses on sufferings and flaws of humans like excessive love, greed, over-ambition. The genre involves terrible and sorrowful events. Examples include Romeo & Juliet, Anna Karenina, Hamlet.`,
    readingSuggestions: [
      'The Shack: Where Tragedy Confronts Eternity',
      'The Tragedy of Hamlet, Prince of Denmark',
    ],
    authorsToLookFor: ['William Shakespeare', 'John Green', 'Anne Frank'],
    cover: book2,
    genre: 'Fiction',
    year: 1600,
    price: 300,
    rating: 4.7,
  },
  {
    _id: 'book3',
    title: 'Sci-Fi',
    description: `Science fiction involves advanced science and technology concepts like time traveling, space exploration, extraterrestrial life. Examples: The Dune Chronicles, Frankenstein, Solaris.`,
    readingSuggestions: ['The Midnight Library: A Novel', 'Project Hail Mary'],
    authorsToLookFor: ['Isaac Asimov', 'Robert Heinlein', 'Arthur C. Clarke'],
    cover: book3,
    genre: 'Fiction',
    year: 1950,
    price: 350,
    rating: 4.6,
  },
  {
    _id: 'book4',
    title: 'Fantasy',
    description: `Fantasy stories revolve around magic, supernatural beings, mythologies, and folklores. Examples: Harry Potter, The Chronicles of Narnia, The Dark Tower.`,
    readingSuggestions: ['The Alchemist', 'Harry Potter'],
    authorsToLookFor: ['George R.R. Martin', 'Patrick Rothfuss', 'Robin Hobb'],
    cover: book4,
    genre: 'Fiction',
    year: 1997,
    price: 400,
    rating: 4.8,
  },
  {
    _id: 'book5',
    title: 'Action and Adventure',
    description: `High stakes and risky situations characterize these books. The main characters face physical danger and action scenes. Often connected with other genres like fantasy or sci-fi. Examples: Treasure Island, The Count of Monte Christo.`,
    readingSuggestions: ['Beneath a Scarlet Sky: A Novel', 'The Sentinel: A Jack Reacher Novel'],
    authorsToLookFor: ['Miguel de Cervantes', 'Robert Louis Stevenson', 'Alexandre Dumas'],
    cover: book5,
    genre: 'Fiction',
    year: 1883,
    price: 280,
    rating: 4.4,
  },
  {
    _id: 'book6',
    title: 'Crime & Mystery',
    description: `Stories centered on crime and its solving. Mystery arises when the culprit is unknown. Protagonists usually solve the case. Examples: Gone Girl, Sherlock Holmes, Murder on the Orient Express.`,
    readingSuggestions: ['Where the Crawdads Sing', 'The Silent Patient'],
    authorsToLookFor: ['Agatha Christie', 'Gillian Flynn', 'Stephen King'],
    cover: book6,
    genre: 'Fiction',
    year: 1920,
    price: 320,
    rating: 4.3,
  },
  {
    _id: 'book7',
    title: 'Romance',
    description: `Stories of loving relationships, struggles, and happy or tragic endings. Examples: Romeo and Juliet, Love Story, Pride and Prejudice.`,
    readingSuggestions: ['It Ends with Us', 'When We Believed in Mermaids'],
    authorsToLookFor: ['Nicholas Sparks', 'Danielle Steel', 'Nora Roberts'],
    cover: book7,
    genre: 'Fiction',
    year: 1813,
    price: 270,
    rating: 4.2,
  },
  {
    _id: 'book8',
    title: 'Humor and Satire',
    description: `Humor aims to amuse; satire critiques society with irony and dark humor. Examples: The Ultimate Hitchhiker’s Guide to the Galaxy, Animal Farm, Don Quixote.`,
    readingSuggestions: ['Born a Crime', 'Animal Farm'],
    authorsToLookFor: ['Douglas Adams', 'Terry Pratchett', 'Joseph Heller'],
    cover: book8,
    genre: 'Fiction',
    year: 1979,
    price: 310,
    rating: 4.1,
  },
  {
    _id: 'book9',
    title: 'Horror',
    description: `Books that provoke fear, terror, and shock. Often inspired by folklore and mythology with ghosts, demons, vampires, etc. Examples: House of Leaves, It, The Shining.`,
    readingSuggestions: ['If It Bleeds', 'Dracula'],
    authorsToLookFor: ['Stephen King', 'Dean Koontz', 'Clive Barker'],
    cover: book9,
    genre: 'Fiction',
    year: 1977,
    price: 330,
    rating: 4.5,
  },
  {
    _id: 'book10',
    title: 'Comics',
    description: `Stories told through sequential art and dialogue. Includes manga, esoteric comics, and adult comics. Examples: Watchmen, The Sandman, Doom Patrol.`,
    readingSuggestions: ['Catch-22', 'Strange Planet'],
    authorsToLookFor: ['Stan Lee', 'Frank Miller', 'Alan Moore'],
    cover: book10,
    genre: 'Fiction',
    year: 1986,
    price: 290,
    rating: 4.0,
  },
  {
    _id: 'book11',
    title: 'Biography and Autobiography',
    description: `Detailed narrations of someone's life (biography) or self-narration (autobiography). Stories of achievements, regrets, and relationships. Examples: A Beautiful Mind, Wild, The Diary Of A Young Girl.`,
    readingSuggestions: ['Greenlights', 'This Is Going to Hurt'],
    authorsToLookFor: ['Alexander Hamilton', 'Manfred von Richthofen', 'Billy Bishop'],
    cover: book11,
    genre: 'Non-Fiction',
    year: 2000,
    price: 400,
    rating: 4.6,
  },
  {
    _id: 'book12',
    title: 'Memoirs',
    description: `Focus on specific events or experiences of an individual. Examples: Just Kids, Men We Reaped, Night.`,
    readingSuggestions: ['Just as I Am', 'The Glass Castle'],
    authorsToLookFor: ['George Orwell', 'Beryl Markham', 'Jesmyn Ward'],
    cover: book12,
    genre: 'Non-Fiction',
    year: 1990,
    price: 350,
    rating: 4.3,
  },
  {
    _id: 'book13',
    title: 'Cookbooks',
    description: `Collections of recipes from famous chefs or themed cuisines. Examples: Pinch of Nom, 10-Day Green Smoothie Cleanse.`,
    readingSuggestions: ['Pinch of Nom: 100 Home-Style Recipes for Health and Weight Loss', '10-Day Green Smoothie Cleanse'],
    authorsToLookFor: ['Mary Berry', 'Paul Hollywood', 'Jessica Seinfeld'],
    cover: book13,
    genre: 'Non-Fiction',
    year: 2015,
    price: 450,
    rating: 4.4,
  },
  {
    _id: 'book14',
    title: 'True Stories',
    description: `True-life stories about history, crime, or other real events that read like fiction. Examples: The Good People, Empress Orchid, Without a Country.`,
    readingSuggestions: ['If You Tell', 'Spilled Milk'],
    authorsToLookFor: ['Meg Waite Clayton', 'Jesmyn Ward', 'Emma Cline'],
    cover: book14,
    genre: 'Non-Fiction',
    year: 2010,
    price: 370,
    rating: 4.1,
  },
  {
    _id: 'book15',
    title: 'Self Help',
    description: `Books aimed to improve life aspects like relationships, health, finances. Examples: How to Win Friends and Influence People, Think and Grow Rich.`,
    readingSuggestions: ['Think and Grow Rich', 'The Power of Now'],
    authorsToLookFor: ['Dale Carnegie', 'Napoleon Hill', 'Eckhart Tolle'],
    cover: book15,
    genre: 'Non-Fiction',
    year: 1936,
    price: 390,
    rating: 4.7,
  },
  
];

