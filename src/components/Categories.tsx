import React from "react";

type CategoriesProps = {
    value: number;
    onClickCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]


const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

    return (
        <div className="categories">
            <ul>
                {categories.map((nameCategory, i) => (
                    <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
                        {nameCategory}
                    </li>
                ))}
            </ul>
        </div>
    );
})

export default Categories;