import { Item } from '@/models';

/**
 * Dados MOCKS de filmes e séries
 */
export const items: Item[] = [
    {
        id: '1',
        title: 'Interestelar',
        description:
            'Em um futuro próximo, a Terra está se tornando inabitável. Um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.',
        imageUrl: 'https://i.pinimg.com/736x/3f/09/dd/3f09ddcc1d3c3740f6a74e63d57fba61.jpg',
        rating: 8.7,
        year: 2014,
        genre: ['Ficção Científica', 'Drama', 'Aventura'],
        duration: '2h 49min',
        type: 'movie',
    },
    {
        id: '2',
        title: 'Breaking Bad',
        description:
            'Um professor de química do ensino médio diagnosticado com câncer começa a fabricar metanfetamina para garantir o futuro financeiro de sua família.',
        imageUrl: 'https://i.pinimg.com/1200x/37/62/75/37627587496965efcc0ae42ac9dff525.jpg',
        rating: 9.5,
        year: 2008,
        genre: ['Drama', 'Crime', 'Suspense'],
        duration: '5 temporadas',
        type: 'series',
    },
    {
        id: '3',
        title: 'O Poderoso Chefão',
        description:
            'O patriarca de uma família do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
        imageUrl: 'https://i.pinimg.com/736x/a6/32/97/a63297ce5c4ca30560b6938cb9d927a2.jpg',
        rating: 9.2,
        year: 1972,
        genre: ['Drama', 'Crime'],
        duration: '2h 55min',
        type: 'movie',
    },
    {
        id: '4',
        title: 'Stranger Things',
        description:
            'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais e uma garotinha estranha.',
        imageUrl: 'https://i.pinimg.com/736x/d1/b3/ce/d1b3ce53670fd7bdba01c8bea6af1639.jpg',
        rating: 8.7,
        year: 2016,
        genre: ['Drama', 'Fantasia', 'Terror'],
        duration: '4 temporadas',
        type: 'series',
    },
    {
        id: '5',
        title: 'Pulp Fiction',
        description:
            'As vidas de dois assassinos da máfia, um boxeador, um gângster e sua esposa se entrelaçam em quatro histórias de violência e redenção.',
        imageUrl: 'https://i.pinimg.com/1200x/89/41/e7/8941e71464be8fe81ade92a86817338e.jpg',
        rating: 8.9,
        year: 1994,
        genre: ['Crime', 'Drama'],
        duration: '2h 34min',
        type: 'movie',
    },
    {
        id: '6',
        title: 'Game of Thrones',
        description:
            'Nove famílias nobres lutam pelo controle das terras míticas de Westeros, enquanto um antigo inimigo retorna após estar adormecido por milênios.',
        imageUrl: 'https://i.pinimg.com/736x/a4/b9/9c/a4b99c529e4647452d033a150475cfa8.jpg',
        rating: 9.3,
        year: 2011,
        genre: ['Ação', 'Aventura', 'Drama'],
        duration: '8 temporadas',
        type: 'series',
    },
    {
        id: '7',
        title: 'Matrix',
        description:
            'Um hacker descobre a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.',
        imageUrl: 'https://i.pinimg.com/1200x/ab/7e/36/ab7e36eafb7b7723a76b066929a0a4b5.jpg',
        rating: 8.7,
        year: 1999,
        genre: ['Ação', 'Ficção Científica'],
        duration: '2h 16min',
        type: 'movie',
    },
    {
        id: '8',
        title: 'The Office',
        description:
            'Uma comédia documental sobre um grupo de funcionários típicos de escritório, onde a interação entre eles é mostrada de forma humorística.',
        imageUrl: 'https://i.pinimg.com/736x/63/df/9b/63df9b3e20ace8eb033a35344ed0df95.jpg',
        rating: 9.0,
        year: 2005,
        genre: ['Comédia'],
        duration: '9 temporadas',
        type: 'series',
    },
    {
        id: '9',
        title: 'Inception',
        description:
            'Um ladrão que rouba segredos corporativos através da tecnologia de compartilhamento de sonhos recebe a tarefa de plantar uma ideia na mente de um CEO.',
        imageUrl: 'https://i.pinimg.com/1200x/36/9b/35/369b358ebedfa9592acd9580ab4060d6.jpg',
        rating: 8.8,
        year: 2010,
        genre: ['Ação', 'Ficção Científica', 'Suspense'],
        duration: '2h 28min',
        type: 'movie',
    },
    {
        id: '10',
        title: 'Dark',
        description:
            'Uma saga familiar com viagem no tempo, situada em uma cidade alemã onde a desaparição de duas crianças expõe conexões entre quatro famílias.',
        imageUrl: 'https://i.pinimg.com/1200x/e8/2f/82/e82f828f60f7d210d7c8574595c771e9.jpg',
        rating: 8.7,
        year: 2017,
        genre: ['Crime', 'Drama', 'Mistério'],
        duration: '3 temporadas',
        type: 'series',
    },
];

/**
 * Busca um item pelo ID
 */
export function getItemById(id: string): Item | undefined {
    return items.find((item) => item.id === id);
}

/**
 * Busca itens por gênero
 */
export function getItemsByGenre(genre: string): Item[] {
    return items.filter((item) =>
        item.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
}

/**
 * Busca itens por tipo
 */
export function getItemsByType(type: 'movie' | 'series'): Item[] {
    return items.filter((item) => item.type === type);
}
