python -u export_inference_graph.py \
  --model_name=inception_v4 \
  --output_file=/home/wangjiawei/models/slim/module_train/module_inception_v4.pb \
  --dataset_name=mcookie_module \
  --dataset_dir=/home/wangjiawei/models/slim/module_dataset

NEWEST_CHECKPOINT=$(ls -t1 /home/wangjiawei/models/slim/module_train/model.ckpt*| head -n1)
NEWEST_CHECKPOINT=${NEWEST_CHECKPOINT%.*}

python -u /usr/lib/anaconda3/lib/python3.6/site-packages/tensorflow/python/tools/freeze_graph.py \
  --input_graph=/home/wangjiawei/models/slim/module_train/module_inception_v4.pb \
  --input_checkpoint=$NEWEST_CHECKPOINT \
  --output_graph=/home/wangjiawei/models/slim/module_train/module_inception_v4_freeze.pb \
  --input_binary=True \
  --output_node_name=InceptionV4/Logits/Predictions

cp /home/wangjiawei/models/slim/module_dataset/labels.txt ./module_inception_v4_freeze.label
