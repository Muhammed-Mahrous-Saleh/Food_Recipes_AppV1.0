import { FavouriteContext } from "@/context/context";
import Header from "@/modules/Shared/components/header/Header";
import Loading from "@/modules/Shared/components/loading/Loading";
import NoData from "@/modules/Shared/components/no-data/NoData";
import { IMAGE_PATH } from "@/modules/Shared/utils/urls";
import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const FavList = () => {
    const { favouriteList, addToFavourites, removeFromFavourites, favLoading } =
        useContext(FavouriteContext);

    return (
        <>
            <Header
                title={"Favourites"}
                subTitle={"Items !"}
                description={
                    "This is your favourite items list. You can add or remove items from here."
                }
            />
            <div className="favourites-cards d-flex gap-3 p-5 justify-content-center">
                {favLoading && !favouriteList && <Loading />}
                {favouriteList.length === 0 && <NoData title={"Favourites"} />}
                {favouriteList?.map((item) => {
                    console.log(item);
                    return (
                        <div className="favourite-card" key={item.id}>
                            <Card
                                style={{
                                    width: "18rem",
                                }}
                                className="shadow position-relative"
                            >
                                <div className="action-btn position-absolute">
                                    {favouriteList.includes(item) ? (
                                        <Button
                                            variant="success"
                                            onClick={() => {
                                                removeFromFavourites(
                                                    item.recipe
                                                );
                                            }}
                                        >
                                            <i className="fa fa-heart"></i>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline-success"
                                            onClick={() => {
                                                addToFavourites(item);
                                            }}
                                        >
                                            <i className="fa fa-heart"></i>
                                        </Button>
                                    )}
                                </div>
                                <div className="card-img-container">
                                    <Card.Img
                                        variant="top"
                                        src={IMAGE_PATH(item.recipe.imagePath)}
                                        className="w-100 object-fit-contain"
                                        alt={item.recipe.name}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/400?text=No+Image";
                                        }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between">
                                        {item.recipe.name}
                                        <div className="tag fs-6 fst-italic text-muted px-3 py-1 rounded-2 bg-success-subtle">
                                            #{item.recipe.category[0].name}
                                        </div>
                                    </Card.Title>
                                    <Card.Text className="d-flex flex-column">
                                        <h6 className="text-muted">
                                            Description
                                        </h6>
                                        <p className="px-1">
                                            {item.recipe.description}
                                        </p>
                                        <div className="d-flex card-footer jusify-self-end justify-content-between bg-transparent">
                                            {/* add bootstrap tag */}
                                            <div className="tag fs-6 fst-italic text-muted px-3 py-1 rounded-2 bg-success-subtle">
                                                {item.recipe.tag.name}
                                            </div>
                                            <div className="price text-success fs-5 fw-bold text-end">
                                                {item.recipe.price}{" "}
                                                <sup className="text-muted currency fa-superpowers">
                                                    EGP
                                                </sup>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default FavList;
