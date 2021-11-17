import { authenticatedGet, authenticatedPost } from "../calls";

export interface Grupo {
  grupoId: number;
  titulo: string;
  perfil: number;
}

export interface Seccion {
  seccionId: number;
  titulo: string;
  reels: Reel[];
}

export interface Reel {
  reelId: number;
  titulo: string;
  liked?: boolean;
  //add coins to the model
  coins?: string;
  favorito?: boolean;
  imagen?: string;
  // video url
  url: string;
  duracion?: string;
  monedas?: number;
}

export interface ReelPopular extends Reel {
  grupoId: number;
  cantidadLikes: number;
}

export default {
  getReel: (reelId: number): Promise<Reel> => authenticatedGet(`/reel/${reelId}`),
  getAllGroups: (): Promise<Grupo[]> => authenticatedGet('/reels/grupos'),
  getSectionWithReelsByGroup: (groupId: number): Promise<Seccion[]> => authenticatedGet(`/reels/grupo/${groupId}`),
  getPopularReelsByGroup: (groupId: number): Promise<ReelPopular[]> => authenticatedGet(`/reels/populares/${groupId}`),
  likeReel: (reelId: number, like: boolean): Promise<void> => authenticatedPost('/reel/like', { reelId, like }),
  favoriteReel: (reelId: number): Promise<void> => authenticatedPost('', { reelId })
};
