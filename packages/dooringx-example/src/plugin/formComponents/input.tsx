/*
 * @Author: yehuozhili
 * @Date: 2021-07-07 14:32:55
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-08-05 15:27:21
 * @FilePath: \dooringx\packages\dooringx-example\src\plugin\formComponents\input.tsx
 */
import { Col, Input, Row } from 'antd';
import React, { memo, useMemo } from 'react';

import { deepCopy, UserConfig } from 'dooringx-lib';
import { CreateOptionsRes } from 'dooringx-lib/dist/core/components/formTypes';
import { IBlockType } from 'dooringx-lib/dist/core/store/storetype';
import { FormMap } from '../formTypes';
import styles from './index.less';

interface MInputProps {
	data: CreateOptionsRes<FormMap, 'input'>;
	current: IBlockType;
	config: UserConfig;
}

function MInput(props: MInputProps) {
	const option = useMemo(() => {
		return props.data.option || {};
	}, [props.data]);
	const store = props.config.getStore();
	return (
		<Row className={styles['form-row']}>
			<Col span={6} className={styles['form-column']}>
				{option.label || '文字'}：
			</Col>
			<Col span={18}>
				<Input
					value={props.current.props[option.receive!] || ''}
					onChange={(e) => {
						const receive = (option as any).receive;
						const clonedata = deepCopy(store.getData());
						const newblock = clonedata.block.map((v: IBlockType) => {
							if (v.id === props.current.id) {
								v.props[receive] = e.target.value;
							}
							return v;
						});
						store.setData({ ...clonedata, block: [...newblock] });
					}}
				></Input>
			</Col>
		</Row>
	);
}

export default memo(MInput);
