class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {};
        // console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryString };
        // remove field from query
        const removeField = ['keyword','limit','page'];

        removeField.forEach(el => delete queryCopy[el]);

        // advance filter
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryString));
        return this;
        
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage-1) ;
        this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;