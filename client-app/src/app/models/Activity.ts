export interface Activity {
    title: string;
    description: string;
    category: string;
    venue: string;
    city: string;
    date: string;
    id: string;
}

export interface Activities {
    activities : Activity[]
}