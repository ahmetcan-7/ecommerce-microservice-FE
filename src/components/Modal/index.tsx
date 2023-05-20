import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  onClickModal?: () => void;
  title: string;
  disableBtn?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
export default function Modal({
  open,
  setOpen,
  onClickModal,
  title,
  disableBtn = false,
  children,
  onClose,
}: ModalProps) {
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleOpen = () => {
    handleClose();
    onClickModal && onClickModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        {!disableBtn && (
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleOpen} autoFocus>
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
