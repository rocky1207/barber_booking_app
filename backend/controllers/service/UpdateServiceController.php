<?php

class UpdateServiceController {
    public function updateService($data) {
        $data['id'] = (int)$data['id'];
        $data['price'] = (int)$data['price'];
        var_dump($data);
        exit();
    }
}
?>