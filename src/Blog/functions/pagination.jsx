import React from "react"

export const Pagination = (props) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++ ) {
        pageNumbers.push(i)
    }

    return (
            <ul className = 'pagination__list'>
                {
                    pageNumbers.map((number) => (
                            <li key={number}>{
                                <a href="#" onClick={() => props.paginate(number)}>{number}</a>
                            }</li>
                        )
                    )
                }

            </ul>
    )
}