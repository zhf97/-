python -u /home/wangjiawei/models/slim/txy/train_image_classifier.py \
  --dataset_name=mcookie_red \
  --dataset_dir=/home/wangjiawei/models/slim/All_colors_dataset/red \
    --dataset_split_name=train \
  --checkpoint_path=/home/wangjiawei/models/slim/pretrain/inception_v4.ckpt \
  --model_name=inception_v4 \
  --checkpoint_exclude_scopes=InceptionV4/Logits,InceptionV4/AuxLogits/Aux_logits \
  --trainable_scopes=InceptionV4/Logits,InceptionV4/AuxLogits/Aux_logits \
  --train_dir=/home/wangjiawei/models/slim/All_colors_train/red \
  --learning_rate=0.001 \
  --learning_rate_decay_factor=0.76\
  --num_epochs_per_decay=50 \
  --moving_average_decay=0.9999 \
  --optimizer=adam \
  --ignore_missing_vars=True \
  --batch_size=32 \
  --max_number_of_steps=10000 \
    --save_summaries_secs=20 \
--save_interval_secs=20


