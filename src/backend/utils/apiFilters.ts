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

    const removedFields = ["location"]; // because we already handle location in search
    removedFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }
}

export default ApiFilters;
