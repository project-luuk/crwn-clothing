import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => (
                <CategoryPreview title={ title } products={ categoriesMap[title] }/>
            ))}
        </Fragment>
    );
};

export default CategoriesPreview;