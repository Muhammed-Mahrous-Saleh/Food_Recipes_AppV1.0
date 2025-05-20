import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../Shared/components/header/Header";
import dashboardImg from "@/assets/images/dashboard-header-img.png";

const Dashboard = () => {
    return (
        <>
            <Header
                title={"Welcome"}
                subTitle={"Upskilling !"}
                description={
                    "This is a welcoming screen for the entry of the application , you can now see the options"
                }
                imgsrc={dashboardImg}
            />
            <div className="dashboard-content px-3">
                <div className="fill-recipes-card p-4 d-flex justify-content-between align-items-center rounded-2">
                    <div className="card-text col-5">
                        <h3>
                            Fill the <span>Recipes</span> !
                        </h3>
                        <p>
                            you can now fill the meals easily using the table
                            and form , click here and sill it with the table !
                        </p>
                    </div>
                    <Link to="recipes" className="card-action-btn btn col-2">
                        Fill Recipes<i class="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
