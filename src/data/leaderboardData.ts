
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
  },
  {
    id: 6,
    robotName: "Wrecker",
    ownerName: "Pat Silva",
    teamName: "Robo Wreckers",
    wins: 10,
    knockouts: 7,
    imageUrl: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 7,
    robotName: "Voltage",
    ownerName: "Casey Zhang",
    teamName: "Circuit Breakers",
    wins: 9,
    knockouts: 6,
    imageUrl: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 8,
    robotName: "Shockwave",
    ownerName: "Jordan Reed",
    teamName: "Circuit Breakers",
    wins: 8,
    knockouts: 5,
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 9,
    robotName: "Iron Giant",
    ownerName: "Morgan Chen",
    teamName: "Steel Titans",
    wins: 7,
    knockouts: 4,
    imageUrl: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 10,
    robotName: "Colossus",
    ownerName: "Quinn Park",
    teamName: "Steel Titans",
    wins: 6,
    knockouts: 3,
    imageUrl: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 11,
    robotName: "Buzzsaw",
    ownerName: "Avery Williams",
    teamName: "Saw Squad",
    wins: 5,
    knockouts: 3,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 12,
    robotName: "Bladerunner",
    ownerName: "Reese Thompson",
    teamName: "Saw Squad",
    wins: 4,
    knockouts: 2,
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 13,
    robotName: "Inferno",
    ownerName: "Blake Foster",
    teamName: "Flame Throwers",
    wins: 4,
    knockouts: 2,
    imageUrl: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 14,
    robotName: "Firewall",
    ownerName: "Cameron Davis",
    teamName: "Flame Throwers",
    wins: 3,
    knockouts: 1,
    imageUrl: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 15,
    robotName: "Tsunami",
    ownerName: "Dakota Rivers",
    teamName: "Water Warriors",
    wins: 3,
    knockouts: 1,
    imageUrl: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 16,
    robotName: "Hydro",
    ownerName: "Skyler Evans",
    teamName: "Water Warriors",
    wins: 2,
    knockouts: 1,
    imageUrl: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 17,
    robotName: "Earthquake",
    ownerName: "Hayden Stone",
    teamName: "Ground Shakers",
    wins: 2,
    knockouts: 1,
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 18,
    robotName: "Tremor",
    ownerName: "Finley Adams",
    teamName: "Ground Shakers",
    wins: 1,
    knockouts: 0,
    imageUrl: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 19,
    robotName: "Lighting",
    ownerName: "Rowan Garcia",
    teamName: "Thunder Bots",
    wins: 1,
    knockouts: 0,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 20,
    robotName: "Thunder",
    ownerName: "Ellis Martinez",
    teamName: "Thunder Bots",
    wins: 0,
    knockouts: 0,
    imageUrl: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

export const topTeams: Team[] = [
  {
    id: 1,
    name: "Crusher Kings",
    wins: 29,
    losses: 2,
    points: 245,
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Metal Mayhem",
    wins: 25,
    losses: 3,
    points: 230,
    logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Robo Wreckers",
    wins: 21,
    losses: 4,
    points: 210,
    logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Circuit Breakers",
    wins: 17,
    losses: 5,
    points: 195,
    logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Steel Titans",
    wins: 13,
    losses: 6,
    points: 180,
    logo: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 6,
    name: "Saw Squad",
    wins: 9,
    losses: 7,
    points: 165,
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 7,
    name: "Flame Throwers",
    wins: 7,
    losses: 8,
    points: 150,
    logo: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 8,
    name: "Water Warriors",
    wins: 5,
    losses: 9,
    points: 135,
    logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 9,
    name: "Ground Shakers",
    wins: 3,
    losses: 10,
    points: 120,
    logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 10,
    name: "Thunder Bots",
    wins: 1,
    losses: 12,
    points: 105,
    logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];
