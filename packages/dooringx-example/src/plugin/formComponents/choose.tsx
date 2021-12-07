import { Col, Row } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import { deepCopy, UserConfig } from 'dooringx-lib';
import { CreateOptionsRes } from 'dooringx-lib/dist/core/components/formTypes';
import { IBlockType } from 'dooringx-lib/dist/core/store/storetype';
import { FormMap } from '../formTypes';
import styles from './index.less';

interface ChooseProps {
	data: CreateOptionsRes<FormMap, 'choose'>;
	current: IBlockType;
	config: UserConfig;
}

const MChooseButton: FC<ChooseProps> = (props) => {
	const { receive, label } = useMemo(() => props.data.option || {}, [props.data]);
	const store = props.config.getStore();

	const onReaderLoad = (ev: ProgressEvent<FileReader>) => {
		const base64Content = ev.target?.result;
		if (base64Content) {
			const clonedata = deepCopy(store.getData());
			const newblock = clonedata.block.map((v: IBlockType) => {
				if (v.id === props.current.id) {
					v.props[receive] = base64Content;
				}
				return v;
			});

			store.setData({ ...clonedata, block: [...newblock] });
		}
	};

	const onChange = (event: any) => {
		const imageFile = event.target.files[0];
		const reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsDataURL(imageFile);
	};

	return (
		<Row className={styles['form-row']}>
			<Col className={styles['form-column']} span={6}>
				{label}
			</Col>
			<Col className={styles['form-column']} span={18}>
				<input type="file" accept="image/*" onChange={onChange} />
			</Col>
		</Row>
	);
};

export default memo(MChooseButton);
