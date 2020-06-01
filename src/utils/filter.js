
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

    if (options.sex === 'women') {
        filtered = filtered.filter(product => product.fit.includes('women'));
    };

    if (options.sex === 'men') {
        filtered = filtered.filter(product => product.fit.includes('men'));
    };

    if (options.size === 's') {
        filtered = filtered.filter(product => product.size.s > 0);
    };

    if (options.size === 'm') {
        filtered = filtered.filter(product => product.size.m > 0);
    };

    if (options.size === 'l') {
        filtered = filtered.filter(product => product.size.l > 0);
    };

    if (options.price === 'lowest') {
        filtered = filtered.filter(product => product.price > 0 && product.price <= 25);
    };

    if (options.price === 'low') {
        filtered = filtered.filter(product => product.price > 25 && product.price <= 50);
    };

    if (options.price === 'middle') {
        filtered = filtered.filter(product => product.price > 50 && product.price <= 75);
    };

    if (options.price === 'high') {
        filtered = filtered.filter(product => product.price > 75 && product.price <= 100);
    };

    if (options.price === 'highest') {
        filtered = filtered.filter(product => product.price > 100);
    };

    return filtered;

}
