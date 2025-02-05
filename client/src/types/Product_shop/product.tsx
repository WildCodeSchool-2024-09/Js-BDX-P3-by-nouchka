export default interface ProductProps {
  urls: string[];
  name: string;
  swapImage: number;
  onImageClick: (index: number) => void;
}
