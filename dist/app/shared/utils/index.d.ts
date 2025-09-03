interface PaginationParams {
    page: number;
    pageSize: number;
}
interface PageCountParams {
    count: number;
    page: number;
    pageSize: number;
}
interface PaginationResult {
    offset: number;
    limit: number;
}
interface PageCountResult {
    prevPage: number | null;
    currentPage: number;
    nextPage: number | null;
    pageTotal: number;
    pageSize: number;
}
export declare const paginate: ({ page, pageSize, }: PaginationParams) => PaginationResult;
export declare const pageCount: ({ count, page, pageSize, }: PageCountParams) => PageCountResult;
export declare const IsObjectId: (value: string) => Promise<boolean>;
export declare const search: (params: any) => Promise<any>;
export declare const globalSearch: (query: string) => Promise<{
    $regex: RegExp;
    $options: string;
}>;
export {};
//# sourceMappingURL=index.d.ts.map