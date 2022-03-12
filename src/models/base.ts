export interface IBasePagnigation {
   sizePage: number;
   currentPage: number;
   sort: 'ASC' | 'DESC',
}

export type IUserPagnigation = IBasePagnigation & {field: string, status: 'active'|'inActive'|'no', role: string}
export type IParkingPagnigation = IBasePagnigation & {field: string, status: 'active'|'inActive'|'no'}