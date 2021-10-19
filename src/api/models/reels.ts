import { authenticatedGet, authenticatedPost } from "../calls";

interface Grupo {
  id: number;
  titulo: string;
}

interface Seccion {
  id: number;
  titulo: string;
  grupo: Grupo;
}

export interface Reel {
  id: number;
  titulo: string;
  likes: number;
  url: string;
  favorito: boolean;
  like: boolean;
  seccion: Seccion;
}

export default {
  getReel: (reelId: number): Promise<Reel> => authenticatedGet(`/reel/${reelId}`),
  getAllGroups: (): Promise<Grupo[]> => authenticatedGet('/reels/grupos'),
  getReelsByGroup: (groupId: number): Promise<Reel[]> => authenticatedGet(`/reels/grupo/${groupId}`),
  getPopularReelsByGroup: (groupId: number): Promise<Reel[]> => authenticatedGet(`/reels/${groupId}`),
  likeReel: (reelId: number, like: boolean): Promise<void> => authenticatedPost('/reel/like', { reelId, like }),
  favoriteReel: (reelId: number): Promise<void> => authenticatedPost('', { reelId })
};
