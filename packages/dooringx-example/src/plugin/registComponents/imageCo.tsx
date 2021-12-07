import React from 'react';

import { ComponentItemFactory, createPannelOptions, UserConfig } from 'dooringx-lib';
import Store from 'dooringx-lib/dist/core/store';
import { IBlockType } from 'dooringx-lib/dist/core/store/storetype';
import { FormMap } from '../formTypes';

const imageSource = require('@/assets/bonfire.png');

interface ImageProps {
	src: string;
	alt: string;
}

interface ImageConfig {
	data: IBlockType<ImageProps>;
	context: any;
	store: Store;
	config: UserConfig;
}

const ImageComponent = (pr: ImageConfig) => {
	const {
		props: { src, alt },
		height,
		width,
	} = pr.data;

	return <img style={{ height, width }} src={src} alt={alt} />;
};

const ImageCo = new ComponentItemFactory(
	'image',
	'图片组件',
	{
		style: [
			createPannelOptions<FormMap, 'input'>('input', { receive: 'src', label: 'src' }),
			createPannelOptions<FormMap, 'choose'>('choose', {
				receive: 'src',
				label: '图片',
			}),
		],
		fn: [],
	},
	{
		props: {
			src: imageSource,
			alt: '',
		},
		width: 200,
		height: 200,
	},
	(data, context, store, config) => {
		return <ImageComponent {...{ data, context, store, config }} />;
	},
	true
);

export default ImageCo;
