import { MutableRefObject } from 'react';
import { FormHandles } from '@unform/core';

type IFormRef = MutableRefObject<FormHandles | null>;

export default IFormRef;
