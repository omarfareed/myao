import { Button } from "@mui/material";
const FriendButton = ({
  onClick,
  params,
  Icon,
  style = {},
  label,
  className,
}) => {
  return (
    <Button
      variant="contained"
      className={className}
      onClick={() => onClick(...params)}
    >
      <Icon style={{ marginRight: "8px", fontSize: "1.2rem", ...style }} />
      {label}
    </Button>
  );
};
export default FriendButton;
