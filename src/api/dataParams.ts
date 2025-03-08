export interface GetDataParams {
    tags?: string;
    search?: string;
    sort?: string;
    date?: string | null;
    page?: number;
    limit?: number;
    departmentId?: string;
}
