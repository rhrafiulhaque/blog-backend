import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query.search as string;
    if (search) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      };
      this.modelQuery = this.modelQuery.find(searchQuery as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const filterField = this.query.filter as string;
    if (filterField) {
      this.modelQuery = this.modelQuery
        .find({ author: filterField })
        .populate("author");
    }
    return this;
  }

  sort() {
    const sortBy = this.query.sortBy as string;
    const sortOrder = this.query.sortOrder === "asc" ? "" : "-";
    if (sortBy) {
      this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    } else {
      this.modelQuery = this.modelQuery.sort("-createdAt"); // Default sort by newest
    }
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this.query.fields as string;
    if (fields) {
      this.modelQuery = this.modelQuery.select(fields.split(",").join(" "));
    } else {
      this.modelQuery = this.modelQuery.select("-__v");
    }
    return this;
  }
}

export default QueryBuilder;
