import {useSelector} from "react-redux";

const useCategory = () => {

    const states = useSelector(state => state)

    const getCategoryChildren = (category) => {
        return states.categories.data
            .filter(categ => getCategoryPath(categ)
                .find(c => c.id === category.id)
        )
    }

    const getCategoryPath = (category) => {
        let categoryPath = [category]

        while(category.categoryParent){
            categoryPath = [category.categoryParent, ...categoryPath]
            category=category.categoryParent
        }

        return categoryPath
    };

    return {getCategoryChildren, getCategoryPath};
};

export default useCategory;
