class ApiFilters {
  query: any; // query is a modal like room modal
  QueryStr: any; // query str is the searchparams that we get from the url

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.QueryStr = queryStr;
  }

  // search function is used to search the data

  search(): ApiFilters {
    // search by location
    const location = this.QueryStr?.location
      ? {
          // if have location then search
          address: {
            $regex: this.QueryStr.location,
            $options: "i",
          },
        }
      : {
          // else do nothing
        };
    this.query = this.query.find({ ...location });
    return this;
  }

  // filter the data based on other fields
  filters(): ApiFilters {
    const queryCopy = { ...this.QueryStr };

    const removedFields = ["location", "page"]; // because we already handle location in search
    removedFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  // pagination
  pagination(resPerPage: number): ApiFilters {
    const currentPae = Number(this.QueryStr?.page) || 1;

    // calculate the skip based on current page and res per page
    const skip = resPerPage * (currentPae - 1);

    // pass this to mongoose
    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default ApiFilters;
