import { useEffect, useState } from "react";
import style from "./Form.module.css";

import { useSelector, useDispatch } from "react-redux";
import { addPokemon } from "../../Redux/actions";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    img: "",
    types: [],
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const changeCheckbos = (e) => {
    
    if (form.types.includes(e.target.name)) {
      form.types = form.types.filter((id) => id !== e.target.name);
      setForm({
        ...form,
        types: form.types,
      });
    } else {
      setForm({
        ...form,
        types: [...form.types, e.target.name],
      });
    }
  };
  const dispatch = useDispatch();
  const pokemonTYPE = useSelector((state) => state.pokemonTypes);

  // useEffect(() => {
  //   dispatch(getPokemonType());

  // }, [dispatch]);

  //Validaciones
  const [errors, setErrors] = useState({
    name: "",
    img: "",
    types: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const validate = (form) => {
    const newErrors = {
      name: "",
      img: "",
      types: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    };

    //name
    if (!/^[A-Za-z]+$/.test(form.name) || form.name === "") {
      
      newErrors.name = "Name must be plain text";
    }

    //image
    if (
      !/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.svg)(\?[^\s[",><]*)?/.test(
        form.img
      ) ||
      form.img === ""
    ) {
      newErrors.img = "An URL of an image is required";
    }

    // Validación de propiedades numéricas

    const numericProps = ["hp", "attack", "defense", "speed"];
    numericProps.forEach((prop) => {
      const value = form[prop];

      if (!/^[1-9][0-9]?$|^255$/.test(value)) {
        newErrors[prop] = "The value has to be between 1 to 255";
      }
    });

    const numericProps2 = ["weight", "height"];

    numericProps2.forEach((prop) => {
      const value = form[prop];
      if (!/^([1-9]\d{0,2}|1000)$/.test(value)) {
        newErrors[prop] = "The value has to be between 1 to 1000";
      }
    });

    setErrors(newErrors);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPokemon(form));
    setForm({
      name: "",
      img: "",
      types: [],
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
    alert("Pokemon Created");
  };

  return (
    <div className={style.divFormContainer}>
      <h2 className={style.titleForm}>Create your Pokemon </h2>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.divData}>
          <div className={style.divContainer}>
            <label htmlFor="">Name: </label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={changeHandler}
            />
            {errors.name && (
              <span className={style.spanErrors}>{errors.name}</span>
            )}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">Image: </label>
            <input
              type="text"
              value={form.img}
              name="img"
              onChange={changeHandler}
            />
            {errors.img && (
              <span className={style.spanErrors}>{errors.img}</span>
            )}
          </div>
          <div className={style.divContainerCheck}>
            <label htmlFor="" className={style.labelTypes}>
              Select Types:{" "}
            </label>
            <br />

            {pokemonTYPE &&
              pokemonTYPE.map((t) => {
                return (
                  <div key={t.id}>
                    <input
                      key={t.id}
                      type="checkbox"
                      name={t.name}
                      id={t.id}
                      onChange={changeCheckbos}
                    />
                    <label htmlFor={t.id}>{t.name}</label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={style.divEstadistics}>
          <h3>Estadisticas:</h3>
          <div className={style.divContainer}>
            <label htmlFor="">Hp: </label>
            <input
              type="number"
              value={form.hp}
              name="hp"
              onChange={changeHandler}
            />{" "}
            {errors.hp && <span className={style.spanErrors}>{errors.hp}</span>}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">Attack: </label>
            <input
              type="number"
              value={form.attack}
              name="attack"
              onChange={changeHandler}
            />{" "}
            {errors.attack && (
              <span className={style.spanErrors}>{errors.attack}</span>
            )}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">Defense: </label>
            <input
              type="number"
              value={form.defense}
              name="defense"
              onChange={changeHandler}
            />
            {errors.defense && (
              <span className={style.spanErrors}>{errors.defense}</span>
            )}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">Speed: </label>
            <input
              type="number"
              value={form.speed}
              name="speed"
              onChange={changeHandler}
            />
            {errors.speed && (
              <span className={style.spanErrors}>{errors.speed}</span>
            )}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">Heigth: </label>
            <input
              type="number"
              value={form.heigth}
              name="height"
              onChange={changeHandler}
            />
            {errors.height && (
              <span className={style.spanErrors}>{errors.height}</span>
            )}
          </div>
          <div className={style.divContainer}>
            <label htmlFor="">weigth: </label>
            <input
              type="number"
              value={form.weight}
              name="weight"
              onChange={changeHandler}
            />
            {errors.weight && (
              <span className={style.spanErrors}>{errors.weight}</span>
            )}
          </div>
        </div>
        <button type="submit">Send new Pokemon</button>
      </form>
    </div>
  );
};
export default Form;
