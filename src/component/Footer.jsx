export default function Footer() {
  const today = new Date().toLocaleDateString();
  return (
    <footer>
     

      <p>© Owned and Developed by ganeshsoftech  last update:{today}</p>
    </footer>
  );
}
