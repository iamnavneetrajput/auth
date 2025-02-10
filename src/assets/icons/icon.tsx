// Import icons from react-icons
import { ImTextColor } from 'react-icons/im';
import { 
  FiBold, FiItalic, FiUnderline, FiImage, FiVideo, FiLink, 
  FiCode, FiSave, FiEye, FiDelete, FiSmile, FiUser, FiCalendar 
} from 'react-icons/fi';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight, CiImageOn, CiVideoOn } from 'react-icons/ci';
import { RiCloseFill } from 'react-icons/ri';
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

// Define props for all icons
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Create a generic wrapper for icons to accept props
const withProps = (Icon: React.ElementType) => (props: IconProps) => <Icon {...props} />;

// Export all icons as components with props support
export const CloseIcon = withProps(RiCloseFill);
export const TextColorIcon = withProps(ImTextColor);
export const BoldIcon = withProps(FiBold);
export const ItalicIcon = withProps(FiItalic);
export const UnderlineIcon = withProps(FiUnderline);
export const ImageIcon = withProps(FiImage);
export const VideoIcon = withProps(FiVideo);
export const LinkIcon = withProps(FiLink);
export const CodeIcon = withProps(FiCode);
export const SaveIcon = withProps(FiSave);
export const EyeIcon = withProps(FiEye);
export const DeleteIcon = withProps(FiDelete);
export const SmileIcon = withProps(FiSmile);
export const CalendarIcon = withProps(FiCalendar);
export const UserIcon = withProps(FiUser);
export const CategoryIcon = withProps(BiCategory);
export const AlignCenterIcon = withProps(CiTextAlignCenter);
export const BulletListIcon = withProps(MdFormatListBulleted);
export const NumberListIcon = withProps(MdFormatListNumbered);
export const AlignLeftIcon = withProps(CiTextAlignLeft);
export const AlignRightIcon = withProps(CiTextAlignRight);
export const ImageOnIcon = withProps(CiImageOn);
export const VideoOnIcon = withProps(CiVideoOn);
export const AddIcon = withProps(IoIosAddCircleOutline);
export const Close = withProps(IoIosCloseCircleOutline);
