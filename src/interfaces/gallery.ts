import { Dayjs } from 'dayjs';

export interface IItemList {
	item: IDataGallery;
}

export interface IItemGallery {
	item: EntriesEntity;
}

export interface IDataGallery {
	date?: string;
	entries?: (EntriesEntity)[] | null;
}
export interface EntriesEntity {
	uid?: number;
	title: string;
	image: string;
	date: Dayjs;
}

export interface GalleryState {
  listGallery: EntriesEntity[],
  listGalleryGroupByMonth: IDataGallery[],
  loading: boolean
}
