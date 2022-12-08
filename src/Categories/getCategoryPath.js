// ENTREE : CATEGORY - OBJECT
// SORTIE : PATH DES CATEGORY PARENTS EN CASCADE - ARRAY OBJECTS

const getCategoryPath = (props) => {

    let category = props.category
    let categoryPath = [category]

    while(category.categoryParent){
        categoryPath = [category.categoryParent, ...categoryPath]
        category=category.categoryParent
    }

    return (
        categoryPath
    );
};

export default getCategoryPath;
