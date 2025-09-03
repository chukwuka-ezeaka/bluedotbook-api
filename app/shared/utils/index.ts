import moment from "moment";
import mongoose from "mongoose";

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

export const paginate = ({
  page,
  pageSize,
}: PaginationParams): PaginationResult => {
  const offset = (parseInt(String(page)) - 1) * pageSize;
  const limit = parseInt(String(pageSize));

  return {
    offset,
    limit,
  };
};

export const pageCount = ({
  count,
  page,
  pageSize,
}: PageCountParams): PageCountResult => {
  const pageTotal = Math.ceil(count / pageSize);
  let prevPage: number | null = null;
  let nextPage: number | null = null;

  if (page == pageTotal && page > 1) {
    prevPage = parseInt(String(page)) - 1;
    nextPage = null;
  } else if (page > 1) {
    prevPage = parseInt(String(page)) - 1;
    nextPage = parseInt(String(page)) + 1;
  } else if (page == 1 && pageTotal > 1) {
    nextPage = 2;
  }

  return {
    prevPage,
    currentPage: parseInt(String(page)),
    nextPage,
    pageTotal,
    pageSize:
      pageSize > count ? parseInt(String(count)) : parseInt(String(pageSize)),
  };
};

export const IsObjectId = async (value: string): Promise<boolean> => {
  try {
    return Boolean(
      value &&
        value.length > 12 &&
        String(new mongoose.Types.ObjectId(value)) === String(value)
    );
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const search = async (params: any): Promise<any> => {
  console.log(
    "🚀 ~ file: misc.service.ts:71 ~ MiscCLass ~ search ~ params:",
    params
  );
  let query: any = {};
  let date: Date | undefined;
  let endDate: Date | undefined;
  for (const value in params) {
    if (value.match(/date|Date|createdAt|endDate|startDate/g)) {
      if (value == "startDate") date = new Date(params[value]);
      if (value == "endDate") endDate = new Date(params[value]);
      if (value !== "startDate" && value !== "endDate") {
        date = new Date(params[value]);
        endDate = new Date(moment(date).add(1, "day").format());
      }
      if (value == "date" && date && endDate) {
        query["date"] = { $gte: date, $lte: endDate };
      } else if (date && endDate) {
        query["createdAt"] = { $gte: date, $lte: endDate };
      }
    } else if (await IsObjectId(String(params[value]))) {
      query[value] = params[value];
    } else if (value == "recepient") {
      query = {
        ...query,
        $or: [{ user: params[value] }, { counsellor: params[value] }],
      };
    } else if (params[value] == "true" || params[value] == true) {
      query[value] = true;
    } else if (params[value] == "false" || params[value] == false) {
      query[value] = false;
    } else if (value == "category" || value == "categories") {
      query[value] = { $in: params[value] };
    } else {
      const $regex = new RegExp(params[value]);
      const $options = "i";
      query[value] = { $regex, $options };
    }
  }
  return query;
};

export const globalSearch = async (
  query: string
): Promise<{ $regex: RegExp; $options: string }> => {
  const $regex = new RegExp(query);
  const $options = "i";
  return { $regex, $options };
};
