import { ReactComponent as Favourite } from "../../assets/favouriteBtn.svg";

const FavouriteBtn = ({ onClick, isFavourite, className }) => {
  return (
    <Favourite
      onClick={onClick}
      style={isFavourite ? { color: "red" } : null}
      className={className}
    />
  );
};

export default FavouriteBtn;
