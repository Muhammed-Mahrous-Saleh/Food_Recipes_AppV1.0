import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoadingTable = ({ col_count, row_count }) => {
    return (
        <>
            <tbody>
                {Array.from({ length: row_count }).map((_, index) => (
                    <tr key={index}>
                        {Array.from({ length: col_count }).map((_, index) => (
                            <td key={index}>
                                {" "}
                                <Skeleton />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
};

export default SkeletonLoadingTable;
