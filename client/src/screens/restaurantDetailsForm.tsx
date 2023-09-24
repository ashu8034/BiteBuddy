import { FormEvent, ChangeEvent, useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { AddCircle } from "@mui/icons-material";

//export const ENDPOINT = "http://localhost:8080/api";

interface OpeningHours {
  day: string;
  open: string;
  close: string;
}
interface Menu {
  name: string;
  price: number;
  description: string;
  image: string | null;
  [key: string]: any;
}

function RestaurantDetailsForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([
    { day: "Monday", open: "", close: "" },
    { day: "Tuesday", open: "", close: "" },
    { day: "Wednesday", open: "", close: "" },
    { day: "Thursday", open: "", close: "" },
    { day: "Friday", open: "", close: "" },
    { day: "Saturday", open: "", close: "" },
    { day: "Sunday", open: "", close: "" },
  ]);

  const [restaurantImage, setRestaurantImage] = useState<File | null>(null);

  const [menu, setMenu] = useState<Menu[]>([
    { name: "", price: 0, description: "", image: null },
  ]);

  const handleMenuChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newMenu = [...menu];
    newMenu[index][name] = value;
    setMenu(newMenu);
  };

  const handleAddMenu = () => {
    setMenu([...menu, { name: "", price: 0, description: "", image: null }]);
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMenu = [...menu];
        newMenu[index].image = event.target?.result as string;
        setMenu(newMenu);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle submit logic here
    console.log(name, location, openingHours, menu);
  };

  const handleOpeningHoursChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newOpeningHours = [...openingHours];
    newOpeningHours[index][name as keyof OpeningHours] = value;
    setOpeningHours(newOpeningHours);
  };

  const handleAddOpeningHours = () => {
    setOpeningHours([
      ...openingHours,
      { day: "", open: "", close: "" } as OpeningHours,
    ]);
  };

  const handleRestaurantImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setRestaurantImage(files[0]);
    }
  };

  return (
    <div>
      <h1>Add Restaurant Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Restaurant Image:
          <input type="file" onChange={handleRestaurantImageChange} />
        </label>
        <h2>Opening Hours</h2>
        {openingHours.map((hours, index) => (
          <div key={index}>
            <label>
              Day:
              <input
                type="text"
                name="day"
                value={hours.day}
                onChange={(e) => handleOpeningHoursChange(e, index)}
              />
            </label>
            <label>
              Open:
              <input
                type="text"
                name="open"
                value={hours.open}
                onChange={(e) => handleOpeningHoursChange(e, index)}
              />
            </label>
            <label>
              Close:
              <input
                type="text"
                name="close"
                value={hours.close}
                onChange={(e) => handleOpeningHoursChange(e, index)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddOpeningHours}>
          Add Opening Hours
        </button>
        <Grid container spacing={2}>
          {menu.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6">Item {index + 1}</Typography>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={item.name}
                onChange={(e) => handleMenuChange(e, index)}
              />
              <TextField
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={item.price}
                onChange={(e) => handleMenuChange(e, index)}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                value={item.description}
                onChange={(e) => handleMenuChange(e, index)}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id={`item-image-${index}`}
                type="file"
                onChange={(e) => handleImageChange(e, index)}
              />
              <label htmlFor={`item-image-${index}`}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ marginTop: "10px" }}
                >
                  Upload Image
                </Button>
              </label>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ marginTop: "10px", maxWidth: "200px" }}
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <IconButton onClick={handleAddMenu}>
              <AddCircle />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Menu
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default RestaurantDetailsForm;
