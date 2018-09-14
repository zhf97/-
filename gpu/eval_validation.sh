python -u eval_image_classifier.py \
  --dataset_name=mcookie_blue \
  --dataset_dir=/home/wangjiawei/models/slim/All_colors_dataset/blue \
  --dataset_split_name=validation \
  --model_name=inception_v4 \
  --checkpoint_path=/home/wangjiawei/models/slim/All_colors_train/blue \
   --eval_dir=/home/wangjiawei/models/slim/All_colors_dataset/blue \
  --num_examples=2

