<script setup lang="ts">
import {type IColumn} from '@/model/table/IColumn'
defineProps<{column?: IColumn, row: any}>()
</script>
<template>
<td><slot name="default" :column="column" :row="row" >{{ column ? row[column?.property] : '' }}</slot></td>
</template>