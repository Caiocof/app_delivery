import { useEffect, useState, ReactElement } from 'react';
import Popover from '@mui/material/Popover';

interface BasicPopoverProps {
  anchorElement: HTMLButtonElement | null;
  onHandleAnchor?: (value: HTMLButtonElement | null) => void;
  children?: ReactElement;
}

export const BasicPopover = ({ anchorElement, onHandleAnchor, children }: BasicPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    if (onHandleAnchor) {
      onHandleAnchor(null)
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    setAnchorEl(anchorElement)
  }, [anchorElement])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </div>
  );
}
