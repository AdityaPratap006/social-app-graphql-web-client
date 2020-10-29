import React, { useRef, useState, useEffect } from 'react';
import { ImageUploadArea, ImageUploadPreview } from './style';
import { FormControl } from '../Input/style';
import Button from '../Button';

interface ImageUploadProps {
    id: string;
    center?: boolean;
    onInput: (id: string, file: File, isValid: boolean) => void;
    errorText: string;
    initialImageURL?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);

    const filePickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                setPreviewUrl(fileReader.result);
            }
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile: File | undefined;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        if (pickedFile) {
            props.onInput(props.id, pickedFile, fileIsValid);
        }
    }

    const pickImageHandler = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }
    }

    return (
        <FormControl>
            <input
                ref={filePickerRef}
                id={props.id}
                style={{
                    display: 'none',
                }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <ImageUploadArea className={`${props.center && 'center'}`}>
                <ImageUploadPreview>
                    {!previewUrl && props.initialImageURL && <img alt="preview" src={props.initialImageURL} />}
                    {previewUrl && <img alt="preview" src={previewUrl} />}
                    {!previewUrl && !props.initialImageURL && <p>Please pick an image.</p>}
                </ImageUploadPreview>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </ImageUploadArea>
            {file && !isValid && <p>{props.errorText}</p>}
        </FormControl>
    );
};

export default ImageUpload;
