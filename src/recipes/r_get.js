import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import '../style.css'

const GetRecipes = () => {

    const naving = useNavigate();
    const recipes = useSelector((state) => state?.recipes);
    const categories = useSelector((state) => state?.category);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [duration, setDuration] = useState();
    const [difficulty, setDifficulty] = useState();

    const nav = (r) => {
        naving("/r_details", { state: r });
    };

    useEffect(() => {
        setFilteredRecipes(recipes.filter(f => (!categoryId || f.CategoryId === categoryId) && (!duration || f.Duration === duration) && (!difficulty || f.Difficulty === difficulty)));
    }, [categoryId, duration, difficulty]);

    const imageStyle = {
        width: "30%",
        height: "20%",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px",
    };

    return (
        <Fragment>
            <h2>Get-Recipes</h2>

            <label>Category</label>
            <Select onChange={(i) => setCategoryId(i.target.value)}>
                <MenuItem value="Category">Category</MenuItem>
                {categories?.map((c) => (
                    <MenuItem value={c.Id} key={c.Id}>
                        {c.Name}
                    </MenuItem>
                ))}
            </Select>
            <label>Duration</label>
            <Select onChange={(d) => setDuration(d.target.value)}>

                <MenuItem value="">Duration</MenuItem>
                {recipes?.map((c) => (
                    <MenuItem value={c.Duration} key={c.Id}>
                        {c.Duration}
                    </MenuItem>
                ))}
            </Select>
            <label>Difficulty</label>
            <Select onChange={(d) => setDifficulty(d.target.value)}>
                <MenuItem value="">Difficulty</MenuItem>
                {recipes?.map((c) => (
                    <MenuItem value={c.Difficulty} key={c.Id}>
                        {c.Difficulty}
                    </MenuItem>
                ))}
            </Select>

            <Container>
                {/* <h3>Get Recipes</h3> */}
                <Row>
                    {filteredRecipes.map((r) => (
                        <Col key={r.id} md={4} className="mb-4">
                            <Card bg="dark" text="white">
                                <Card.Img variant="top" src={r.Img} style={imageStyle} />
                                <Card.Body>
                                    <Card.Title> {r.Name}</Card.Title>
                                    <div>
                                        <Button variant="outline-dark" style={{ background: "black" ,color:"white",borderRadius:"5px white "}} className="w-100" onClick={() => nav(r)}>
                                            Detail
                                        </Button>
                                        <br></br>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Fragment>
    );
};

export default GetRecipes;
