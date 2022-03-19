export interface IBasePagnigation {
  sizePage: number;
  currentPage: number;
  sort: 'ASC' | 'DESC';
}

export type IUserPagnigation = IBasePagnigation & {
  field: string;
  status: 'active' | 'inActive' | 'ban' | 'no';
  role: string;
};
export type IParkingPagnigation = IBasePagnigation & {
  field: string;
  status: 'active' | 'inActive' | 'no';
};
export type IUserBanPagnigation = IBasePagnigation & {
  field: string;
  status: 'active' | 'ban';
};
export type IParkingNotify = IBasePagnigation & {
  field: string;
  status: 'processing' | 'reject';
};
