function imageUploaded(file: File | null): Promise<string> | null {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  } else {
    return null;
  }
}

export default imageUploaded;
