const uploadImages = (files, currentFiles, setFiles) => {
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onloadend = () => {
      setFiles((prevFiles) => {
        if (prevFiles.length < 5) {
          return [...prevFiles, reader.result];
        } else {
          return prevFiles;
        }
      });
    };
  }
};
export default uploadImages;
/*

input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await axios.post("/api/singleImg", formData);
        const IMG_URL = result.data;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log("실패");
      }


*/
