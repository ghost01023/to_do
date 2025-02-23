import os

def extract_tsx_content(directory):
    output_file = "code.txt"
    with open(output_file, "w", encoding="utf-8") as outfile:
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith(".tsx"):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, "r", encoding="utf-8") as tsx_file:
                            content = tsx_file.read()
                            outfile.write(f"\n--- {file_path} ---\n")
                            outfile.write(content + "\n")
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")
    print(f"Extraction complete. All .tsx content saved to {output_file}")

if __name__ == "__main__":
    extract_tsx_content(os.getcwd())