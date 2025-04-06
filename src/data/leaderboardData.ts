
export interface Robot {
  id: number;
  robotName: string;
  ownerName: string;
  teamName: string;
  wins: number;
  knockouts: number;
  imageUrl: string;
}

export interface Team {
  id: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
  logo: string;
}

export const topRobots: Robot[] = [
  {
    id: 1,
    robotName: "Decimator",
    ownerName: "Alex Morgan",
    teamName: "Crusher Kings",
    wins: 15,
    knockouts: 12,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    robotName: "Pulverizer",
    ownerName: "Riley Johnson",
    teamName: "Crusher Kings",
    wins: 14,
    knockouts: 10,
    imageUrl: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    robotName: "Havoc",
    ownerName: "Sam Wilson",
    teamName: "Metal Mayhem",
    wins: 13,
    knockouts: 11,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    robotName: "Chaos",
    ownerName: "Jamie Lee",
    teamName: "Metal Mayhem",
    wins: 12,
    knockouts: 9,
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    robotName: "Demolisher",
    ownerName: "Taylor Kim",
    teamName: "Robo Wreckers",
    wins: 11,
    knockouts: 8,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

export const topTeams: Team[] = [
  {
    id: 1,
    name: "Crusher Kings",
    wins: 12,
    losses: 2,
    points: 245,
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Metal Mayhem",
    wins: 11,
    losses: 3,
    points: 230,
    logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Robo Wreckers",
    wins: 10,
    losses: 4,
    points: 210,
    logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Circuit Breakers",
    wins: 9,
    losses: 5,
    points: 195,
    logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Steel Titans",
    wins: 8,
    losses: 6,
    points: 180,
    logo: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];
