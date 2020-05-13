
export const handleFilter = (options, products) => {

    let filtered = products.slice();

    if (options.search) {
        const search = options.search.toLowerCase();
        filtered = filtered.filter(product => {
            if (product.name.includes(search) || product.category.includes(search)) {
                return product;
            }
            return null;
        });
    };

    if (options.price !== 30) {
        filtered = filtered.filter(product => product.price < options.price);
    };

    if (options.sizeSm === "on") {
        filtered = filtered.filter(product => product.size.s > 0);
    };

    if (options.sizeMd === "on") {
        filtered = filtered.filter(product => product.size.m > 0);
    };

    if (options.sizeLg === "on") {
        filtered = filtered.filter(product => product.size.l > 0);
    };
    return filtered;

}
