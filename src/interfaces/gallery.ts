import { Dayjs } from 'dayjs';

export interface IItemList {
	item: IDataGallery;
}

export interface IItemGallery {
	item: EntriesEntity;
}
export interface IItemGalleryProps {
	item: EntriesEntity;
	index: number
}

export interface IDataGallery {
	date?: string;
	entries?: (EntriesEntity)[] | null;
}
export interface EntriesEntity {
	uid?: number;
	title: string;
	caption:string,
	image: string;
	date: Dayjs;
}

export interface UpdateCaption {
	uid?: number;
	title: string;
}

export interface GalleryState {
  listGallery: EntriesEntity[],
  listGalleryGroupByMonth: IDataGallery[],
  loading: boolean
}
